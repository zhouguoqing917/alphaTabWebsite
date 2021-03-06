import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBadge from './code-badge';
import getPageList from './page';

function buildPropertyUrl(property) {
    let url = '';
    if (property.prop('todo', false)) {
        url = "#todo";
    } else if (url = property.prop('link')) {
        url = useBaseUrl('docs/' + url);
    } else {
        url = useBaseUrl('docs/' + property.prop('id'));
    }
    return url;
}

function ReferenceRow({ property }) {
    const jsNames = property.props('jsName');
    const jsonNames = property.props('jsonName');
    const jQueryNames = property.props('jQueryName');
    const domNames = property.props('domName');
    const javaScriptOnly = property.prop('javaScriptOnly', false);
    return (
        <tr>
            <td>
                <a href={buildPropertyUrl(property)}>
                    {!javaScriptOnly && <CodeBadge type="net" name={property.prop('title')} />}
                    {!javaScriptOnly && jsNames.length > 0 && <br />}
                    {jsNames.map(n => <CodeBadge type="js" name={n} />)}
                    {jsonNames.length > 0 && <br />}
                    {jsonNames.map(n => (<CodeBadge type="json" name={n} />))}
                    {jQueryNames.length > 0 && <br />}
                    {jQueryNames.map(n => (<CodeBadge type="jquery" name={n} />))}
                    {domNames.length > 0 && <br />}
                    {domNames.map(n => (<CodeBadge type="html" name={n} />))}
                </a>
            </td>
            <td>{property.prop('description')}</td>
        </tr>
    )
}

function ReferenceCategory({ name, pages }) {
    const rows = pages
        .orderBy(p => p.prop('order', 1000), p => p.prop('title', ''))
        .map(p => (<ReferenceRow key={p.prop('id')} property={p} />))
        .toArray();
    return (
        <>
            <tr>
                <th colSpan="4">{name}</th>
            </tr>
            {rows}
        </>
    );
}

export function ReferenceTable({filter, type}) {
    const pages = getPageList(filter)
        .filter(p => p.prop('showInTable', true))
        .groupBy(p => p.prop('category', ''))
        .orderBy(p => p.key);
    const categories = pages
        .map(p => (<ReferenceCategory key={p.key} name={p.key} pages={p.items} />))
        .toArray();
    return (
        <table className="table table-striped table-condensed reference-table">
            <thead>
                <tr>
                    <th>{type}</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {categories}
            </tbody>
        </table>
    )
}

export default ReferenceTable;