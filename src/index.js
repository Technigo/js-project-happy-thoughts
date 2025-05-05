fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts");
const app = document.querySelector("app");
const thoughts = document.querySelector("thoughts");
const form = document.querySelector("form");
const [loading, setLoading] = useState(true)
setLoading(false)

var template = `
<style type="text/css">
    .tftable {font-size:14px;color:#333333;width:100%;border-width: 1px;border-color: #87ceeb;border-collapse: collapse;}
    .tftable th {font-size:18px;background-color:#87ceeb;border-width: 1px;padding: 8px;border-style: solid;border-color: #87ceeb;text-align:left;}
    .tftable tr {background-color:#ffffff;}
    .tftable td {font-size:14px;border-width: 1px;padding: 8px;border-style: solid;border-color: #87ceeb;}
    .tftable tr:hover {background-color:#e0ffff;}
</style>

<table class="tftable" border="1">
    <tr>
        <th>ID</th>
        <th>Message</th>
        <th>Hearts</th>
        <th>Created At</th>
    </tr>
    
    {{#each response}}
        <tr>
            <td>{{_id}}</td>
            <td>{{message}}</td>
            <td>{{hearts}}</td>
            <td>{{createdAt}}</td>
        </tr>
    {{/each}}
</table>
`;

function constructVisualizerPayload() {
    return { response: pm.response.json() }
}

pm.visualizer.set(template, constructVisualizerPayload());