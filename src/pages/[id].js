import 'semantic-ui-css/semantic.min.css'
import Image from 'next/image'
import { Button, Grid, Segment } from 'semantic-ui-react'
import Link from 'next/link'


export default function (props){

  const data = props.data  

  return(
	<Segment placeholder textAlign='center' style={{marginTop: '100px'}}>
    <Link href={`/`}>
	    <Button labelPosition='left' icon='left chevron' content='Back' />
    </Link>
    <Grid columns={1} relaxed='very' stackable style={{marginTop: '20px'}}>
      <Grid.Column>
        <Image width={'50px'} height={'50px'} src='/../public/af.jpg' alt='Logo'/>
        <h1>{data.name}</h1>
        <Button size='large'>
          Share
        </Button>
        <Button size='large' style={{marginTop: '10px'}}>
          Send Notification
        </Button>
      </Grid.Column>
	  </Grid>

	</Segment>
  )
}

export const getServerSideProps = async (ctx) =>{
  const id = ctx.params.id

  const res = await fetch(`http://localhost:8080/api/account/${id}`)

  const data = await res.json()

  return {
    redirect: data.redirect,
    props: {
      data
    }
  }
}