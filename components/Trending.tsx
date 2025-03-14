import { View, Text,FlatList } from 'react-native'
import React from 'react'

interface Post {
    id: string;
    // add other properties of Post if needed
}

interface TrendingProps {
    posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
return (
    <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                    <Text style={{ fontSize: 16, color: 'black' }}>{item.id}</Text>
            )}
            horizontal
    />
)
}

export default Trending