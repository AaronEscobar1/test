import 'semantic-ui-css/semantic.min.css'
import { useState, useEffect } from 'react'
import Router from 'next/router';
import Image from 'next/image'
import { Button, Card, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios';
import Link from 'next/link';

export default function HomePage({accounts}){

  const [state, setState] = useState(accounts)
  const [input, handleInput] = useState({ name: ''})
  const [send, handleSend] = useState(false)
    
  useEffect(async (ctx) => {
    try {
      let url = 'http://localhost:3000/api/account'

      await axios.get(url)
      .then((response)=>{
        setState(response.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }, [send]);


  const handleChange = (e, { name, value }) =>{ handleInput({ [name]: value })}

  const handleSubmit = async (e) => {

    let url = 'http://localhost:3000/api/account'

    await axios.post(url, {
      name : input.name
    })
    .then((response)=>{
      handleSend(!send)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  const deleteAccount = async (e) => {

    let url = `http://localhost:3000/api/account/${e}`

    await axios.delete(url)
    .then((response)=>{
      handleSend(!send)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  return(
    <Segment placeholder textAlign='center' style={{marginTop: '100px'}}>
      <Grid columns={1} relaxed='very' stackable style={{marginTop: '20px'}}>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              icon='user'
              iconPosition='left'
              name='name'
              label='Username'
              placeholder='Username'
              value={input.name}
              onChange={handleChange}
            />

            <Button content='Create' primary type="submit"/>
          </Form>
        </Grid.Column>
      </Grid>

      <div style={{marginTop: '100px', marginBottom: '50px'}}>
        <Card.Group>
          {
            state.map(account => (
              <Card as='a' key={account._id}>
                <Link href={`/${account.name}`}>
                  <Card.Content>
                    <Image width={'50px'} height={'50px'} src='/../public/af.jpg' alt='Logo'/>
                    <Card.Header>{account.name}</Card.Header>
                  </Card.Content>
                </Link>
                <Card.Content extra>
                  <div className='ui one buttons'>
                    <Button basic color='red' onClick={e => deleteAccount(account._id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))
          }
        </Card.Group>
      </div>

    </Segment>
  )
}

export const getServerSideProps = async (ctx) =>{
  const res = await fetch('http://localhost:8080/api/account')
  const accounts = await res.json()

  return {
    props: {
      accounts
    }
  }
}