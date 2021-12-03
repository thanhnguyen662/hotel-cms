import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

function BreadcrumbBar(props) {
   const { username } = props;

   const DynamicProductBreadcrumb = () => <span>{username}</span>;

   const routes = [
      { path: '/profile/:userId', breadcrumb: DynamicProductBreadcrumb },
   ];

   const breadcrumbs = useReactRouterBreadcrumbs(routes);

   return (
      <>
         <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
            fontWeight='bold'
            fontSize='sm'
            color='gray.500'
            mb='5'
         >
            {breadcrumbs.map(({ breadcrumb, match }) => (
               <BreadcrumbItem key={match.pathname}>
                  <BreadcrumbLink as={Link} to={match.pathname}>
                     {breadcrumb}
                  </BreadcrumbLink>
               </BreadcrumbItem>
            ))}
         </Breadcrumb>
      </>
   );
}

export default BreadcrumbBar;
