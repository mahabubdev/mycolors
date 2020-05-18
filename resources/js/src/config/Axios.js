export const apiHeader = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const envDomain = process.env.MIX_APP_DOMAIN;
export const apiURL = envDomain + '/api'