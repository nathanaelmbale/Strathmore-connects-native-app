import React from "react"

const PostsContext = React.createContext();

const PostsConextProvider = ({ children }) => {
    const [ val , setVal ] = React.useState(0)
    const [ val1 , setVal1 ] = React.useState(1)
    const [ val3 , setVal3 ] = React.useState(2)
    return (
        <PostsContext.Provider value={{
            val,
            setVal,
            val1,
            setVal1,
            val3,
            setVal3
        }}>
            { children }
        </PostsContext.Provider>
    )
}

export {PostsConextProvider , PostsContext}