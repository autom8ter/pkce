import * as R from 'ramda';
import * as React from 'react';
import JSONTree from 'react-json-tree';

export interface IJsonTree {
    data: any;
    title: string;
    shouldExpandNode?: (keyPath: Array<string | number>, data: [any] | {}, level: number) => boolean;
}

export const JsonTree:React.FC<IJsonTree> = ({
    data,
    title,
    shouldExpandNode,
                                  }) => {

    return renderJsonData({
        data: data,
        title: title,
        shouldExpandNode: shouldExpandNode,
    })
}

function renderJsonData(tree: IJsonTree) {
    return R.not(R.isEmpty(tree.data)) && R.not(R.isNil(tree.data)) ? (
        <>
            <h1>{tree.title}</h1>
            <JSONTree data={tree.data} theme="bright" shouldExpandNode={tree.shouldExpandNode} />
        </>
    ) : null;
}