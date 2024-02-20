import {useAuthData} from "../hooks/useAuthHook";
import AppLayout from "../components/AppLayout";
import Typography from "@mui/material/Typography";
import organisationService from "../services/organisations"
import {useEffect} from "react";
import {setOrganisation} from "../reducers/organisationsReducer";
import {useDispatch} from "react-redux";
import {useOrganisationData} from "../hooks/useOrganisationsHook";

function Organisation(){
  const auth = useAuthData()
  const dispatch = useDispatch();
  const organisationData = useOrganisationData()

  useEffect(() => {
    const loadOrganisation = async () => {
      const organisation = await organisationService.get(auth, auth.organisation)
      console.log("load organisation", organisation)
      dispatch(setOrganisation(organisation))
    }

    if (!organisationData) {
      loadOrganisation()
    }
  }, []);

  console.log(auth)

  return organisationData ? (
    <>
      <AppLayout>
        <Typography variant="h4" gutterBottom>
          Organisation
        </Typography>
        <Typography variant="h5" gutterBottom>
          {organisationData.name}
        </Typography>
        <Typography>
          TODO: restricted access, members management
        </Typography>
      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  ) : <Typography>Loading...</Typography>
}

export default Organisation