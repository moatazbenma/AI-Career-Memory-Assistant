from celery import shared_task
from django.core.cache import cache
import requests
import json
from .models import Analysis, Result, Repository, Job
import logging

logger = logging.getLogger(__name__)


def format_result_field(data: any) -> str:
    """
    Convert various data types to readable text format
    """
    if not data:
        return ''
    
    # If it's a string, return as-is
    if isinstance(data, str):
        return data
    
    # If it's a list, format as numbered items
    if isinstance(data, list):
        return '\n'.join(f"{i + 1}. {item}" for i, item in enumerate(data))
    
    # If it's a dict, format key-value pairs
    if isinstance(data, dict):
        lines = []
        for key, value in data.items():
            formatted_key = key.replace('_', ' ').title()
            if isinstance(value, list):
                lines.append(f"{formatted_key}:")
                for item in value:
                    lines.append(f"  • {item}")
            else:
                lines.append(f"{formatted_key}: {value}")
        return '\n'.join(lines)
    
    # Otherwise, convert to JSON string for readability
    return json.dumps(data, indent=2)


@shared_task(bind=True)
def analyze_repository(self, analysis_id):
    """
    Celery task that analyzes a repository against a job description.
    
    Flow:
    1. Fetch Analysis, Job, and Repository from database
    2. Get repository code/data from GitHub
    3. Analyze code against job requirements
    4. Save results to Result model
    5. Update Analysis status
    """
    
    try:
        # Step 1: Fetch database records
        analysis = Analysis.objects.get(id=analysis_id)
        job = analysis.job
        repo = analysis.repo
        user = job.user
        
        # Update analysis status to "processing"
        analysis.status = "processing"
        analysis.save()
        
        # Step 2: Get or update Result with this task's ID
        result, created = Result.objects.get_or_create(
            analysis=analysis,
            defaults={
                'task_id': self.request.id,  # Store Celery task ID
                'star_bullets': '',
                'interview_questions': '',
                'summary': ''
            }
        )
        
        # Always ensure task_id is current (in case it was created with a different ID)
        if result.task_id != self.request.id:
            result.task_id = self.request.id
            result.save()
        
        # Step 3: Fetch repository data from GitHub
        repo_data = fetch_github_repo_data(user, repo)
        job_description = job.job_description
        
        # Step 4: Analyze the repository
        analysis_result = analyze_code(repo_data, job_description)
        
        # Step 5: Save results - format for readable display
        # Convert lists and dicts to readable text
        star_bullets = format_result_field(analysis_result.get('star_bullets', []))
        interview_questions = format_result_field(analysis_result.get('interview_questions', []))
        summary = analysis_result.get('summary', '')
        if isinstance(summary, (dict, list)):
            summary = json.dumps(summary, indent=2)
        else:
            summary = str(summary)
        
        result.star_bullets = star_bullets
        result.interview_questions = interview_questions
        result.summary = summary
        result.save()
        
        # Step 6: Update analysis status to "completed"
        analysis.status = "completed"
        analysis.save()
        
        logger.info(f"Analysis {analysis_id} completed successfully")
        return {
            'status': 'success',
            'analysis_id': analysis_id,
            'result_id': result.id
        }
        
    except Analysis.DoesNotExist:
        logger.error(f"Analysis {analysis_id} not found")
        return {'status': 'error', 'message': 'Analysis not found'}
        
    except Exception as e:
        logger.error(f"Error analyzing repository: {str(e)}")
        # Update analysis status to "failed"
        try:
            analysis = Analysis.objects.get(id=analysis_id)
            analysis.status = "failed"
            analysis.save()
        except:
            pass
        raise


def fetch_github_repo_data(user, repo):
    """
    Fetch repository data from GitHub API.
    
    Returns: Dictionary with repository information
    """
    if not user.access_token:
        raise Exception("User does not have GitHub access token")
    
    headers = {
        'Authorization': f'token {user.access_token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    try:
        # Parse repo_name to get owner and repo_name
        # Format should be: "owner/repo_name"
        parts = repo.metadata['full_name'].split('/')
        logger.info(parts)
        if len(parts) != 2:
            raise Exception(f"Invalid repo name format: {repo.repo_name}")
        
        owner, repo_name = parts
        
        # Fetch repository info
        repo_url = f"https://api.github.com/repos/{owner}/{repo_name}"
        repo_response = requests.get(repo_url, headers=headers)
        repo_response.raise_for_status()
        repo_info = repo_response.json()
        
        # Fetch repository contents (list of files)
        contents_url = f"https://api.github.com/repos/{owner}/{repo_name}/contents"
        contents_response = requests.get(contents_url, headers=headers)
        contents_response.raise_for_status()
        contents = contents_response.json()
        
        return {
            'repo_info': repo_info,
            'contents': contents,
            'owner': owner,
            'repo_name': repo_name
        }
        
    except requests.exceptions.RequestException as e:
        logger.error(f"GitHub API request failed: {str(e)}")
        raise Exception(f"Failed to fetch repository data from GitHub: {str(e)}")


def analyze_code(repo_data, job_description):
    """
    Analyze the repository against the job description.
    
    This is where the AI/LLM analysis happens.
    For now, this is a placeholder implementation.
    
    Args:
        repo_data: Dictionary with GitHub repository data
        job_description: String with job requirements
    
    Returns:
        Dictionary with analysis results:
        - star_bullets: List of strengths/matches
        - interview_questions: List of suggested interview questions
        - summary: Overall analysis summary
    """
    
    # Placeholder logic - replace with actual AI analysis
    repo_info = repo_data.get('repo_info', {})
    repo_name = repo_data.get('repo_name', 'Unknown')
    
    star_bullets = [
        f"Repository: {repo_name}",
        f"Stars: {repo_info.get('stargazers_count', 0)}",
        f"Language: {repo_info.get('language', 'Unknown')}",
        "Well-documented codebase" if repo_info.get('description') else "Needs better documentation"
    ]
    
    interview_questions = [
        "Can you walk us through the main architecture of this project?",
        "What was the most challenging part of building this?",
        "How do you handle testing and CI/CD?",
        "Describe your contribution to this project."
    ]
    
    summary = f"""
    Analysis of {repo_name} against job requirements.
    
    Repository Overview:
    - Description: {repo_info.get('description', 'No description')}
    - Language: {repo_info.get('language', 'Unknown')}
    - Stars: {repo_info.get('stargazers_count', 0)}
    - Forks: {repo_info.get('forks_count', 0)}
    
    Job Match:
    This repository demonstrates experience with {repo_info.get('language', 'coding')}.
    The project scope suggests familiarity with {job_description[:100]}...
    """
    
    return {
        'star_bullets': star_bullets,
        'interview_questions': interview_questions,
        'summary': summary
    }
