import {useAuthData} from "../hooks/useAuthHook.js";
import AppLayout from "../components/AppLayout.tsx";
import Typography from "@mui/material/Typography";
import organisationService from "../services/organisations"
import {useEffect} from "react";
import {setOrganisation} from "../reducers/organisationsReducer";
import {useOrganisationData} from "../hooks/useOrganisationsHook.js";
import {useAppDispatch} from "../hooks/hooks.ts";

function Organisation(){
  const auth = useAuthData()
  const dispatch = useAppDispatch();
  const organisationData = useOrganisationData()

  useEffect(() => {
    const loadOrganisation = async () => {
      let organisation_id = null
      if (auth.currentUser) {
        organisation_id = auth.currentUser.organisation
      }
      if (organisation_id) {
        const organisation = await organisationService.get(auth, organisation_id)
        console.log("load organisation", organisation)
        dispatch(setOrganisation(organisation))
      }
    }

    if (!organisationData.id) {
      loadOrganisation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return organisationData?.id ? (
    <>
      <AppLayout title="Organisation">
        <Typography variant="h5" gutterBottom>
          {organisationData.name}
        </Typography>
        <Typography>
          TODO: restricted access, members management
        </Typography>
      </AppLayout>
    </>
  ) : <Typography>Loading...</Typography>
}

export default Organisation