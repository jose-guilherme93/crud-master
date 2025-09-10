import { posts } from '../mockData.js'


export const profile = (req, res) => {
    
        res.status(200).json({
            
            message: posts
     })

} 