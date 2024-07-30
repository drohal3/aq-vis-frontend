import {useAuthData} from "../hooks/useAuthHook.js";
import AppLayout from "../components/AppLayout.tsx";
import Typography from "@mui/material/Typography";
import organisationService from "../services/organisations"
import {useEffect} from "react";
import {OrganisationMember, setOrganisation} from "../reducers/organisationsReducer";
import {useOrganisationData} from "../hooks/useOrganisationsHook.js";
import {useAppDispatch} from "../hooks/hooks.ts";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';

function OrganisationMembers({members}:{members:OrganisationMember[]}) {
  return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="organisation members">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="center">Organisation admin</TableCell>
              <TableCell align="center">Disabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map(member => (
                <TableRow key={member.id}>
                  <TableCell>{member.full_name}</TableCell>
                  <TableCell align="right">{member.email}</TableCell>
                  <TableCell align="center">{member.is_admin ? (<CheckIcon />) : (<RemoveIcon/>)}</TableCell>
                  <TableCell align="center">{member.disabled ? (<CheckIcon />) : (<RemoveIcon/>)}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

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
        let organisation
        try {
           organisation = await organisationService.get(auth, organisation_id)
        } catch (e) {
          window.location.reload()
        }
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
        <Typography gutterBottom>
          Name: {organisationData.name}
        </Typography>
        <Typography variant="h5">
          Members:
        </Typography>
        <OrganisationMembers members={organisationData?.members ?? []}/>
      </AppLayout>
    </>
  ) : <Typography>Loading...</Typography>
}

export default Organisation