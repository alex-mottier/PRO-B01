/**
 * @file    Edit.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    20.04.2021
 * @brief   Meeting editing page
 */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Create from '../Create/Create';

const Edit: React.FC = () => {
  return <Create isEditMode={true} />;
};

export default observer(Edit);
