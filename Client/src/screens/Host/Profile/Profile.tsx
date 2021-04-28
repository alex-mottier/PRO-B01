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
} from 'react-native-paper';

import { observer } from 'mobx-react-lite';


const Profile: React.FC = () => {

    return (        <Provider>
        <SafeAreaView>
            <ScrollView>
                <View>

                </View>
            </ScrollView>
        </SafeAreaView>
    </Provider>);
}

export default observer(Profile);