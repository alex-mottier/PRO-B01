/**
 * @file    Search.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Search meeting page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {
    Provider,
    useTheme,
} from 'react-native-paper';

import styles from './styles';
import { observer } from 'mobx-react-lite';
// import GlobalStore from '../../../app/stores/GlobalStore';

const Create: React.FC = () => {
    // Usage of react native paper theme library
    const paperTheme = useTheme();

    /* Usage of MobX global state store */
    //const store = React.useContext(GlobalStore);
    return (        <Provider>
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.container, { backgroundColor: paperTheme.colors.surface }]}>

                </View>
            </ScrollView>
        </SafeAreaView>
    </Provider>);
}

export default observer(Create);