import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import BorrowerPipeline from '../components/BorrowerPipeline/BorrowerPipeline';
import BorrowerDetails from '../components/BorrowerDetails/BorrowerDetails';
import BrokerOverview from '../components/BrokerOverview/BrokerOverview';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [activeBorrower, setActiveBorrower] = useState('1');
  const [searchTerm] = useState('');

  return (
    <Layout>
      <div className="md:col-span-3 ">
        <BorrowerPipeline
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeBorrower={activeBorrower}
          setActiveBorrower={setActiveBorrower}
          searchTerm={searchTerm}
        />
      </div>
      <div className="md:col-span-5">
        <BorrowerDetails borrowerId={activeBorrower} />
      </div>
      <div className="md:col-span-4">
        <BrokerOverview />
      </div>
    </Layout>
  );
};

export default Dashboard;
