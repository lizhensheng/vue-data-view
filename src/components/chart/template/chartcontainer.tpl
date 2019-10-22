<template>
    <div class="pindex">
        <% for(let i =0;i<configs.length;i++){ %>
            <<%- configs[i].chartId%>></<%- configs[i].chartId%>>
        <% } %>
    </div>
</template>
<script>
    <% for(let i =0;i<configs.length;i++){ %>
    import   <%- configs[i].chartId.substr(0,1).toUpperCase()+configs[i].chartId.substr(1)%> from  'components/page/charts/<%- configs[i].chartId%>'
    <% } %>
    export default {
        components:{
            <% for(let i =0;i<configs.length;i++){ %>
                <%- configs[i].chartId.substr(0,1).toUpperCase()+configs[i].chartId.substr(1)%>,
             <% } %>
        }
    }
</script>