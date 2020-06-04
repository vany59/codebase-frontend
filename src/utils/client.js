import ApolloClient from 'apollo-boost'

const port = process.env.BACKEND_PORT || 4000
const url = process.env.BACKEND_URL || 'localhost'
const endpoint = process.env.BACKEND_ENDPOINT || 'graphql'
const client = new ApolloClient({
  uri: `http://${url}:${port}/${endpoint}`,
})
export default client
