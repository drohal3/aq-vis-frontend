import Container from "@mui/material/Container";
import NavBar from "../components/Nav"

function Home(){
  return (
    <>
      <NavBar/>
      <Container maxWidth="lg">
        This is home <br/>
        For logged in user: overview of groups? To be decided!!!
      </Container>
    </>
  )
}

export default Home