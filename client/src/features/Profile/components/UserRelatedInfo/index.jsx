import { Tab, TabList, TabPanel, Tabs, TabPanels } from '@chakra-ui/tabs';
import React from 'react';
// import PropTypes from 'prop-types';

UserRelatedInfo.propTypes = {};

function UserRelatedInfo(props) {
   return (
      <Tabs
         bg='white'
         rounded={'lg'}
         boxShadow={'xl'}
         h='100%'
         colorScheme='blue'
      >
         <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
         </TabList>

         <TabPanels>
            <TabPanel>
               <p>one!</p>
            </TabPanel>
            <TabPanel>
               <p>two!</p>
            </TabPanel>
            <TabPanel>
               <p>three!</p>
            </TabPanel>
         </TabPanels>
      </Tabs>
   );
}

export default UserRelatedInfo;
