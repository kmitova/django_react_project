 export default function getAccessToken() {
        let result = window.localStorage.getItem('authTokens');
        if (!result) {
            return "";
        }
        return JSON.parse(result).access;
    }