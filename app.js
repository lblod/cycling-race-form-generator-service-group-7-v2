import { app, sparql, sparqlEscapeDate } from 'mu';

app.get('/jow', function( req, res ) {
  res.send('Hello people. We are group 7!');
} );

app.get('/test', function (req, res) {
  const query = `
        select *
        where {
          ?instance a <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#InstancePublicServiceSnapshot> ;
              <http://data.europa.eu/m8g/thematicArea> <https://productencatalogus.data.vlaanderen.be/id/concept/Thema/Wielerwedstrijd>;
              <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasExecutingAuthority> ?bestuurseenheid ;
              <http://vocab.belgif.be/ns/publicservice#hasRequirement> ?voorwaarde .

          ?voorwaarde <http://purl.org/dc/terms/description> ?voorwaardeBeschrijving .

          FILTER (lang(?voorwaardeBeschrijving) = 'nl')
        } 
      `;

    sparql.query(query).then( function(response) {
        const form = response.results.bindings.map( function(binding) {
          return {
            instance: binding.instance.value
          };
        });
        res.json({ data: form });
    });
  });