import React, { useEffect, useState } from "react"

const CommunitiesContext = React.createContext();

const CommunityContextProvider = ({ children }) => {
    const [error, setError] = useState('')
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await fetch('http://192.168.100.200:9000/community')
                console.log('Response status:', response.status)

                if (response.ok) {
                    const fetchedCommunities = await response.json()

                    setCommunities(fetchedCommunities)
                }
            } catch (error) {
                console.log("Error while fetching", error)
                setError(error)
            }
        }

        fetchCommunities()

    }, [])

    return (
        <CommunitiesContext.Provider value={{ communities }} >
            {children}
        </CommunitiesContext.Provider>
    )
}

export { CommunityContextProvider , CommunitiesContext}

