export const userSchemas = {
    registrationScheme: {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', pattern: "^[A-Z][a-z]+\\s[A-Z][a-z]+$" },
                    group: { type: 'string', pattern: '^[A-Z][A-Z]-[0-9][0-9]$' },
                    idCard: { type: 'string', pattern: '^[A-Z][A-Z]\\s№[0-9]{6}$' },
                    birthDate: { type: 'string', pattern: '^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[1-2][0-9]{3}$' },
                    email: { type: 'string', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
                    password: { type: 'string', pattern: '^(?=\\S{8,}$).+' }
                },
                required: ['name', 'group', 'idCard', 'birthDate', 'email', 'password']
            }
        }
    },

    loginScheme: {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['email', 'password']
            }
        }
    }
}