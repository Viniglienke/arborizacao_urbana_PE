import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Monitoring.css';

const Monitoring = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
      fetchTrees();
  }, []);

  const fetchTrees = async () => {
      try {
          const response = await axios.get('http://localhost:3001/trees');
          console.log(response.data); // Verifique os dados recebidos do backend
          setTrees(response.data);
      } catch (error) {
          console.error("Erro ao buscar árvores:", error);
      }
  };

  return (
      <div className="monitoring-container">
          <h1 className='monitoring-title'>Monitoramento de Árvores</h1>
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nome Científico</th>
                      <th>Data de Plantio</th>
                      <th>Estado de Saúde</th>
                      <th>Localização</th>
                  </tr>
              </thead>
              <tbody>
                  {trees.map(tree => (
                      <tr key={tree.id}>
                          <td>{tree.id}</td>
                          <td>{tree.tipo_arvore_id}</td>
                          <td>{tree.data_plantio}</td>
                          <td>{tree.estado_saude}</td>
                          <td>{tree.area_id}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default Monitoring;
