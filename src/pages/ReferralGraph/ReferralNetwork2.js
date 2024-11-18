// File path: src/components/ReferralNetwork.js

import React, { useEffect, useState, useRef } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Network } from 'vis-network/standalone/esm/vis-network';
import styles from './referral_graph.module.css';

const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 8)}...${key.slice(-8)}`;
};

const fetchReferralTree = async (rootReferrer, nodes, edges, addedNodeIds, setPointsAndCounts) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'referrals_two'));
    const referralMap = new Map();

    querySnapshot.forEach((doc) => {
      const { referrerPublicKey, referredPublicKey } = doc.data();
      if (!referralMap.has(referrerPublicKey)) {
        referralMap.set(referrerPublicKey, []);
      }
      referralMap.get(referrerPublicKey).push(referredPublicKey);
    });

    let totalPoints = 0;
    let levelCounts = [0, 0]; // Level 1, Level 2
    const level2ReferralsSet = new Set(); // Set to track unique Level 2 referrals

    const addNodesAndEdges = (referrer, level = 0) => {
      if (level > 1) return; // Stop adding nodes and edges after Level 2

      const referredList = referralMap.get(referrer) || [];

      referredList.forEach((referredPublicKey) => {
        if (!addedNodeIds.has(referredPublicKey)) {
          nodes.push({
            id: referredPublicKey,
            label: truncatePublicKey(referredPublicKey),
            fullKey: referredPublicKey,
            level: level + 1,
            shape: 'text',
            color: {
              border: '#ADFF00',
              background: '#f5f5f5',
              highlight: {
                border: '#f5f5f5',
                background: '#ADFF00',
              },
              hover: {
                border: '#FF4500',
                background: '#FFE4B5',
              },
            },
            font: { color: '#f5f5f5', size: 14 },
          });
          addedNodeIds.add(referredPublicKey);
        }

        edges.push({
          from: referrer,
          to: referredPublicKey,
          color: '#ADFF00',
          width: 2,
        });

        // Adjust the points calculation for each level
        if (level === 0) {
          totalPoints += 1; // Level 1: 1 point
          levelCounts[0] += 1;
        } else if (level === 1 && !level2ReferralsSet.has(referredPublicKey)) {
          totalPoints += 0.5; // Level 2: 0.5 points
          levelCounts[1] += 1;
          level2ReferralsSet.add(referredPublicKey); // Track this referral
        }

        addNodesAndEdges(referredPublicKey, level + 1);
      });
    };

    nodes.push({
      id: rootReferrer,
      label: truncatePublicKey(rootReferrer),
      fullKey: rootReferrer,
      level: 0,
      color: '#ADFF00',
      shape: 'text',
      font: { color: '#FFF', size: 16, bold: true },
    });
    addedNodeIds.add(rootReferrer);

    addNodesAndEdges(rootReferrer);

    setPointsAndCounts({ totalPoints, levelCounts: [...levelCounts] });

  } catch (error) {
    console.error('Error fetching referral tree:', error);
  }
};

const createReferralNetwork = async (rootReferrer, setPointsAndCounts, networkRef) => {
  try {
    const nodes = [];
    const edges = [];
    const addedNodeIds = new Set();
    const nodeIdToFullKeyMap = new Map();

    await fetchReferralTree(rootReferrer, nodes, edges, addedNodeIds, setPointsAndCounts);

    nodes.forEach((node) => {
      nodeIdToFullKeyMap.set(node.id, node.fullKey);
    });

    const container = document.getElementById('network');
    const data = { nodes, edges };

    const options = {
      nodes: {
        borderWidth: 2,
        color: {
          border: '#000',
          background: '#ADFF00',
          highlight: { border: '#ADFF00', background: '#ADFF00' },
        },
        font: { color: '#000', size: 12 },
        shape: 'dot',
      },
      edges: {
        color: '#ADFF00',
        width: 1,
        smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.5 },
      },
      layout: {
        hierarchical: {
          direction: 'UD',
          nodeSpacing: 300,
          levelSeparation: 200,
        },
      },
      physics: false,
      interaction: {
        zoomView: false,
        dragView: true,
      },
    };

    const network = new Network(container, data, options);
    networkRef.current = network;

    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const fullPublicKey = nodeIdToFullKeyMap.get(nodeId);

        if (fullPublicKey) {
          navigator.clipboard.writeText(fullPublicKey)
            .then(() => {
              alert(`Public key copied: ${fullPublicKey}`);
            })
            .catch((err) => {
              console.error('Failed to copy public key: ', err);
            });
        }
      }
    });
  } catch (error) {
    console.error('Error creating referral network:', error);
  }
};

const ReferralNetwork = () => {
  const [referrerKey, setReferrerKey] = useState('DVU7D8q9VFhbv8ZYH5rixTknrxQwg2JALxDdVwiLcqtu');
  const [pointsAndCounts, setPointsAndCounts] = useState({ totalPoints: 0, levelCounts: [0, 0] });
  const networkRef = useRef(null);

  const handleInputChange = (event) => {
    setReferrerKey(event.target.value);
  };

  const handleGenerateGraph = () => {
    createReferralNetwork(referrerKey, setPointsAndCounts, networkRef);
  };

  // Zoom In and Zoom Out Handlers
  const handleZoomIn = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale * 1.2 });
    }
  };

  const handleZoomOut = () => {
    if (networkRef.current) {
      const scale = networkRef.current.getScale();
      networkRef.current.moveTo({ scale: scale / 1.2 });
    }
  };

  useEffect(() => {
    createReferralNetwork(referrerKey, setPointsAndCounts, networkRef);
  }, [referrerKey, setPointsAndCounts]);

  return (
    <div className={styles.referral_network_container}>
      <h2 className={styles.referral_network_title}>REFERRAL MULTILEVEL REWARDS</h2>

      <div className={styles.input_btn_referral_network_container}>
        <div className={styles.input_container}>
          <input
            type="text"
            value={referrerKey}
            onChange={handleInputChange}
            placeholder="Enter referrer public key"
            className={styles.searchBar}
          />
          <button onClick={handleGenerateGraph} className={styles.general_btn}>
            Generate Graph
          </button>
        </div>

        <div className={styles.zoom_controls}>
          <button onClick={handleZoomIn} className={styles.general_btn}>
            Zoom In
          </button>
          <button onClick={handleZoomOut} className={styles.general_btn}>
            Zoom Out
          </button>
        </div>
      </div>

      <div id="network" style={{ width: '100%', height: '500px', border: '1px solid #ADFF00' }}></div>

      <div className="customTableContainer">
        <table className={styles.referral_table}>
          <thead>
            <tr>
              <th>Level 1 Referrals</th>
              <th>Level 2 Referrals</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> (1 point each)</td>
              <td> (0.5 points each)</td>
              <td>{pointsAndCounts.totalPoints}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralNetwork;
