import {Db, BaseApp, PluginConfig} from 'jovo-core';
import isEmpty = require('is-empty');

export interface Config extends PluginConfig {
    projectId?: String;
    authDomain?: String;
    apiKey?: String;
}

export class FirestoreDb implements Db {
    config: Config = {};
    constructor(config?: Config) {
        if (config && config.projectId && config.authDomain && config.apiKey) {
            config.projectId = config.projectId;
            config.authDomain = config.authDomain;
            config.apiKey = config.apiKey;
        }
    }

    install(app: BaseApp) {
        if (isEmpty(config)) {
            this.firebaseAdmin.initializeApp(this.functions.config().firebase);
        } else {
            this.firebaseAdmin.initializeApp(config);
        }

        this.db = this.firebaseAdmin.firestore();
    }


    /**
     * Returns object for given primaryKey
     * @param {string} primaryKey
     * @return {Promise<any>}
     */
    async load(primaryKey: string): Promise<any> { // tslint:disable-line
        const keyRef = this.db.collection('jovo').doc('users').collection(primaryKey);

        const dataRef = keyRef.doc(key);

        dataRef.get()
            .then((doc) => {
                if (!doc.exists) {
                    return {};
                } else {
                    return doc.data();
                }
            });
    }

    async save(primaryKey: string, key: string, data: object) {
        // firestore error message if response in to save data
        delete value.context.prev[0].response;

        const keyRef = this.db.collection('jovo').doc('users', {merge: true}).collection(this.primaryKey);

        const docRef = keyRef.doc(key);

        if (value.data && Object.keys(value.data).length === 0) {
            delete value.data;
        }
        return docRef.set(value, {merge: true});
    }

}
