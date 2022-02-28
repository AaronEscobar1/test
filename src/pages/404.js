import 'semantic-ui-css/semantic.min.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button, Card, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios';

export default function HomePage(){
  const router = useRouter()

  useEffect( async ()=>{
    const id = router.query.id

    setTimeout(()=>{
        router.push('/');
    }, 3000)

  }, [])
  

  return(
	<Segment placeholder textAlign='center' style={{marginTop: '100px'}}>
	  <Grid columns={1} relaxed='very' stackable style={{marginTop: '20px'}}>
      <Grid.Column>
        <h1>Opppssss</h1>
        <h1>this page not exist</h1>
      </Grid.Column>
	  </Grid>

	</Segment>
  )
}