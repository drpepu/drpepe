import React, { useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Network } from 'vis-network/standalone/esm/vis-network';
import styles from './referral_graph.module.css';


const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 8)}...${key.slice(-8)}`;
};

const fetchReferralTree = async (referrerPublicKey, nodes, edges, addedNodeIds, depth = 0, maxDepth = 3) => {
  if (depth > maxDepth) return; // Stop recursion if maximum depth is reached

  // Fetch referrals for the current referrer
  const querySnapshot = await getDocs(
    collection(db, 'referrals_two')
  );
  
  querySnapshot.forEach((doc) => {
    const { referrerPublicKey: currentReferrer, referredPublicKey } = doc.data();

    // If the current referrer matches, add the referred user
    if (currentReferrer === referrerPublicKey) {
      // Add referred node if not already added
      if (!addedNodeIds.has(referredPublicKey)) {
        nodes.push({
          id: referredPublicKey,
          label: truncatePublicKey(referredPublicKey),
        });
        addedNodeIds.add(referredPublicKey);
      }

      // Add edge from referrer to referred user
      edges.push({
        from: referrerPublicKey,
        to: referredPublicKey,
      });

      // Recursively fetch referrals for this referred user
      fetchReferralTree(referredPublicKey, nodes, edges, addedNodeIds, depth + 1, maxDepth);
    }
  });
};

const createReferralNetwork = async () => {
  try {
    const nodes = [];
    const edges = [];
    const addedNodeIds = new Set(); // Prevent duplicates

    const rootReferrerPublicKey = 'DVU7D8q9VFhbv8ZYH5rixTknrxQwg2JALxDdVwiLcqtu'; // Example root referrer public key

    // Add root node
    nodes.push({
      id: rootReferrerPublicKey,
      label: truncatePublicKey(rootReferrerPublicKey),
    });
    addedNodeIds.add(rootReferrerPublicKey);

    // Fetch the referral tree starting from the root
    await fetchReferralTree(rootReferrerPublicKey, nodes, edges, addedNodeIds);

    // Visualize the graph
    const container = document.getElementById('network');
    const data = { nodes, edges };
    const options = {
      layout: {
        hierarchical: {
          direction: 'UD', // Up-to-down (can be 'LR', 'RL', etc.)
          nodeSpacing: 150,
          levelSeparation: 200,
        },
      },
      physics: false, // Turn off physics for hierarchical layout
    };

    new Network(container, data, options);
  } catch (error) {
    console.error('Error creating referral network:', error);
  }
};

const ReferralNetwork = () => {
  useEffect(() => {
    createReferralNetwork();
  }, []);

  return (
    <div className={styles.referral_network_container}>
      <div id="network" style={{ width: '100%', height: '500px'}}></div>
    </div>
  );
};

export default ReferralNetwork;
