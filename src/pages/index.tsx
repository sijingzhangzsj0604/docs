import React from 'react';
import {Redirect} from '@docusaurus/router';


export default function Home(): JSX.Element {
  return <Redirect to="/cloud/overview/api7-cloud" />;
}
