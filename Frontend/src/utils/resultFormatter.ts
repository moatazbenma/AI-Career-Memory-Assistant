/**
 * Parse and format analysis result data
 * Handles JSON strings, arrays, and plain text
 */
export const parseResultData = (data: any): string => {
    if (!data) return ''
    
    // If it's already a string, check if it's JSON
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data)
            return formatParsedData(parsed)
        } catch {
            // Not JSON, return as-is
            return data
        }
    }
    
    // If it's an object or array, format it
    return formatParsedData(data)
}

const formatParsedData = (data: any): string => {
    // Handle arrays
    if (Array.isArray(data)) {
        return data
            .map((item, idx) => {
                if (typeof item === 'string') {
                    return `${idx + 1}. ${item}`
                }
                return `${idx + 1}. ${JSON.stringify(item)}`
            })
            .join('\n')
    }
    
    // Handle objects
    if (typeof data === 'object' && data !== null) {
        return Object.entries(data)
            .map(([key, value]) => {
                const formattedKey = key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                
                if (Array.isArray(value)) {
                    return `${formattedKey}:\n${value
                        .map((item, idx) => `  ${idx + 1}. ${item}`)
                        .join('\n')}`
                }
                return `${formattedKey}: ${value}`
            })
            .join('\n\n')
    }
    
    return String(data)
}
