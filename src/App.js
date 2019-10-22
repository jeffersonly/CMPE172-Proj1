import React, { useState, useReducer, useEffect } from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify'
import uuid from 'uuid/v4'
import { createUser as CreateUser } from './graphql/mutations'
import { listUsers } from './graphql/queries'
import { onCreateUser } from './graphql/subscriptions'
import { deleteUser as DeleteUser } from './graphql/mutations'
import { onDeleteUser } from './graphql/subscriptions'
import config from './aws-exports'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

const initialState = {
  users: []
}

function reducer(state, action) {
  switch(action.type) {
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'ADD_USER':
      return { ...state, users: [action.user, ...state.users] }
    default:
      return state
  }
}

//function for signing user out
function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

function App() {
  const [file, updateFile] = useState(null)
  const [username, updateUsername] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [avatarUrl, updateAvatarUrl] = useState('')

  function handleChange(event) {
    const { target: { value, files } } = event
    const [image] = files || []
    updateFile(image || value)
  }

  //gets signed s3 url for image to use for rendering in ui
  async function fetchImage(key) {
    try {
      const imageData = await Storage.get(key)
      updateAvatarUrl(imageData)
    } catch(err) {
      console.log('error: ', err)
    }
  }

  //function for downloading file, photos are opened up in new link where users can view 
  async function downloadFile(key) {
    try {
      const file = await Storage.get(key)
      window.open(file, '_blank')
      
    } catch(err) {
      console.log('error: ', err)
    }
  }

  //gets user uploaded item objects (files)
  async function fetchUsers() {
    try {
     let users = await API.graphql(graphqlOperation(listUsers))
     users = users.data.listUsers.items
     dispatch({ type: 'SET_USERS', users })
    } catch(err) {
      console.log('error fetching users')
    }
  }

  //function for deleting file, deletes from view and s3
  async function deleteFile(event) {
    try {
      await Storage.remove(event);
      //await API.graphql(graphqlOperation(DeleteUser, {event}))
    } catch (err) {
      console.log(err);
    }
  }

  //upload data to s3, saves user data to appsync in graphql mutation
  async function createUser(event) {
    event.preventDefault()
    if (!username) return alert('please enter a username')
    if (file && username) {
        const { name: fileName, type: mimeType } = file  
        const key = `${uuid()}${fileName}`
        const fileForUpload = {
            bucket,
            key,
            region,
        }
        const inputData = { username, avatar: fileForUpload }

        try {
          await Storage.put(key, file, {
            contentType: mimeType
          })
          await API.graphql(graphqlOperation(CreateUser, { input: inputData }))
          updateUsername('')
          console.log('successfully stored file data to s3')
        } catch (err) {
          console.log('error: ', err)
        }
    }
  }

  useEffect(() => {
    fetchUsers()
    const subscription = API.graphql(graphqlOperation(onCreateUser))
      .subscribe({
        next: async userData => {
          const { onCreateUser } = userData.value.data
          dispatch({ type: 'ADD_USER', user: onCreateUser })
        }
      })
    return () => subscription.unsubscribe() 
  }, [])

  return (
    <div style={styles.container}>
      <button onClick={signOut}>Log Out</button>
      <br/>
      <input
        label="File to upload"
        type="file"
        onChange={handleChange}
        style={{margin: '10px 0px'}}
      />
      <input
        placeholder='File name/description'
        value={username}
        onChange={e => updateUsername(e.target.value)}
      />
      <button
        style={styles.button}
        onClick={createUser}>Upload File/Image
      </button>
      {
        state.users.map((u, i) => {
          return (
            <div
              key={i}
            >
              <p
                style={styles.username}
                onClick={() => fetchImage(u.avatar.key)}>
                {u.username}
              </p>
              <button
                type="submit"
                onClick={() => downloadFile(u.avatar.key)}
              >
                Download File
              </button>
              <button
                type="submit"
                onClick={() => deleteFile(u.avatar.key)}
              >
                Delete File
              </button>
            </div>
          )
        })
      }
      <img
        src={avatarUrl}
        style={{ width: 300 }}
      />
    </div>
  )
}

const styles = {
  container: {
    width: 300,
    margin: '0 auto'
  },
  username: {
    cursor: 'pointer',
    border: '1px solid #ddd',
    padding: '5px 25px'
  },
  button: {
    width: 200,
    backgroundColor: '#ddd',
    cursor: 'pointer',
    height: 30,
    margin: '0px 0px 8px'
  }
}

export default withAuthenticator(App, { includeGreetings: false })