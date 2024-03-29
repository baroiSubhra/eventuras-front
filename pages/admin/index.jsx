import { Button, Container, Heading, Text } from '@chakra-ui/react';
import { DataTable, Layout, Link, Loading, Unauthorized } from 'components';
import * as dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { EventsService } from '@losol/eventuras';


function AdminIndex() {
  const { data: session, status } = useSession();
  
  const [eventinfos, setEventinfos] = useState([]);
  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'When',
      accessor: 'when',
      Cell: function RenderCell({ row }) {
        return <Text>{dayjs(row.original.dateStart).format('D-MM-YYYY')}</Text>;
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: function RenderCell({ row }) {
        return (
          <Link key={row.original.id} href={`/admin/event/${row.original.id}`}>
            <Button colorScheme="teal">Mer</Button>
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      //TODO try to adjust the Function signature so we do not have to pass parameters like this to pass organisation
      const result = await EventsService.getV3Events(undefined,undefined,undefined,undefined,1)
      setEventinfos(result.data);
    };
    fetchEvents();
  }, [session]);

  if (status === 'loading')
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  if (!session)
    return (
      <Layout>
        <Unauthorized />
      </Layout>
    );

  if (session) {
    return (
      <Layout>
        <Container paddingTop="24">
          <Heading as="h1">Admin</Heading>

          <Link href="/admin/users">
            {' '}
            <Button leftIcon={<FiUsers />} variant="outline">
              Users
            </Button>
          </Link>

          <Heading as="h2" fontSize="2xl" paddingTop="16" paddingBottom="4">
            Arrangement
          </Heading>
          <DataTable columns={columns} data={eventinfos} />
        </Container>
      </Layout>
    );
  }
}

export default AdminIndex;
