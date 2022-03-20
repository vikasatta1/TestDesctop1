export const rules = {
    required: (message: string = 'Obligatory field!') => ({
        required: true,
        message
    })
}
