const url = `${import.meta.env.VITE_API_URL}/api`;

export default async function Fetch(endpoint, Detail = {}) {
    let token = localStorage.getItem('accesBrowserTotheENDUSERS');

    const headers = {
        "Content-type": "application/json",
        'Bypass-Tunnel-Reminder': 'true',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const mergedOptions = {
        ...Detail,
        headers: {
            ...headers,
            ...Detail.headers
        }
    };

    try {
        let response = await fetch(`${url}/${endpoint}`, mergedOptions);

        if (response.status === 401) {
            try {
                const refresher = localStorage.getItem('MainREfreshPageEND');
                
                if (!refresher) throw new Error("No refresh token available");

                const f = await fetch(`${url}/refresh-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken: refresher }) 
                });

                if (f.ok) {
                    const result = await f.json();
                    const newToken = result.token;
                    localStorage.setItem('accesBrowserTotheENDUSERS', newToken);
                    
                    mergedOptions.headers.Authorization = `Bearer ${newToken}`;
                    response = await fetch(`${url}/${endpoint}`, mergedOptions);
                } else {
                    throw new Error("Refresh token expired or invalid please login again");
                }
            } catch (error) {
                localStorage.removeItem('accesBrowserTotheENDUSERS');
                localStorage.removeItem('MainREfreshPageEND');
                localStorage.removeItem('user');
                window.location.href = "/login";
                return; 
            }
        }

        if (!response.ok) {
            const res = await response.json();
            throw new Error(res.message || 'Something went wrong');
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error.message);
        throw error;
    }
}
