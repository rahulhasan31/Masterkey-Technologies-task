import React, { useState } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import './Recursive.css';
import 'react-resizable/css/styles.css';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const Partition = ({ id, color, onSplit, onRemove }) => (
    <div className="partition w-96" style={{ backgroundColor: color }}>
      <button  className='py-1 px-5 rounded-xl  bg-gradient-to-r from-red-500 to-red-700 mb-2' onClick={() => onSplit(id, 'vertical')}>V</button>
      <button className='py-1 px-5 rounded-xl  bg-gradient-to-r from-red-500 to-red-700 mb-2' onClick={() => onSplit(id, 'horizontal')}>H</button>
      <button className='py-1 px-5 rounded-xl  bg-gradient-to-r from-red-500 to-red-700' onClick={() => onRemove(id)}>-</button>
    </div>
  );
  
const Recursive = () => {
    const [partitions, setPartitions] = useState([{ id: 1, color: getRandomColor(), width: 100, height: 100, x: 0, y: 0 }]);

    const splitPartition = (id, direction) => {
      setPartitions((prevPartitions) => {
        const newPartitions = [...prevPartitions];
        const index = newPartitions.findIndex(partition => partition.id === id);
        if (index !== -1) {
          const partition = newPartitions[index];
          const newPartition = { id: Date.now(), color: getRandomColor(), width: partition.width / 2, height: partition.height / 2, x: partition.x, y: partition.y };
          if (direction === 'vertical') {
            partition.width /= 2;
            newPartition.x += partition.width;
          } else {
            partition.height /= 2;
            newPartition.y += partition.height;
          }
          newPartitions.push(newPartition);
        }
        return newPartitions;
      });
    };
  
    const removePartition = (id) => {
      setPartitions((prevPartitions) => prevPartitions.filter(partition => partition.id !== id));
    };
  
    return (
        <div className="app  ">
      {partitions.map((partition) => (
        <ResizableBox key={partition.id} width={partition.width} height={partition.height} axis="both">
          <Partition id={partition.id} color={partition.color} onSplit={splitPartition} onRemove={removePartition} />
        </ResizableBox>
      ))}

      
    </div>
    );
};

export default Recursive;