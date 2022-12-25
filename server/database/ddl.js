import dotenv from 'dotenv';
import WineGlass from '../model/WineGlass.js';
import connection from './connection.js';

dotenv.config();

connection();

const wineGlasses = [
  {
    series: 'RIEDEL Veloce',
    name: 'Cabernet/Merlot',
    grapes: ['Pomerol', 'St. Julien', 'Fronsac', 'St. Estèphe', 'Petit Verdot', 'Merlot', 'Margaux', 'Pauillac', 'Brunello di Montalcino', 'Montepulciano', 'Cabernet Franc', 'Pessac Leognan (Rouge)', 'Graves rouge', 'Médoc', 'Cabernet Sauvignon', 'Carménère', 'St. Emilion', 'Bordeaux (red)', 'Listrac'],
    image: '/api/static/images/wine-glasses/riedel-veloce/cabernet-merlot.webp',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Pinot Noir/Nebbiolo',
    grapes: ['Blauburgunder', 'Moulin à vent', 'Nebbiolo', 'Nerello Mascalese', 'Echézeaux', 'Beaujolais Cru', 'Barbaresco', 'Volnay', 'Blanc de Noirs', 'Romanée Saint Vivant', 'Musigny', 'Chambolle Musigny', 'Vougeot', 'Rosé Champagne', 'Vosne-Romanée', 'Nuits Saint Georges', 'Pinot Noir New World', 'St. Aubin', 'Pinot Noir Old World', 'Burgundy (red)', 'Pommard', 'Barolo', 'Santenay'],
    image: '/api/static/images/wine-glasses/riedel-veloce/pinot-noir-nebbiolo.webp',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Syrah/Shiraz',
    grapes: ['Rioja', 'Malbec', 'Syrah Old World', 'Ribera del Duero', 'Cornas', 'Côtes du Rhône Rouge', 'Crozes Hermitage', 'Bonarda', 'Tinto Reserva', 'Priorat', 'Amarone', 'Carignan', 'Châteauneuf-du-Pape (blanc)', 'Alma Valley', 'Sangiovese', 'Côtes du Roussillon', 'Aglianico', 'Vino Nobile di Montepulciano', 'Barbera', 'Tinta de Toro', 'Touriga Nacional', 'Cannonau', 'Blaufränkisch', 'Graciano', 'Nero d\'Avola', 'Saperavi', 'Zweigelt', 'Bobal', 'St. Joseph (red)', 'Châteauneuf-du-Pape (rouge)', 'Tempranillo', 'Petite Sirah', 'Cahors', 'Teroldego', 'St. Laurent', 'Côte Rôtie', 'Refosco', 'Crianza', 'Montagny', 'Lagrein', 'Côtes du Ventoux', 'Montsant', 'Madiran', 'Grenache/Granacha', 'Gran Reserva', 'Mourvèdre', 'Hermitage (Rouge)', 'Cinsault', 'Mencia', 'Pinotage', 'Hermitage (Blanc)', 'Norton', 'Valpolicella'],
    image: '/api/static/images/wine-glasses/riedel-veloce/syrah-shiraz.webp',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Champagne Wine Glass',
    grapes: ['Champagne', 'Sparkling Wine', 'Cava', 'Franciacorta', 'Sekt', 'Blanc de Blancs', 'Prosecco'],
    image: '/api/static/images/wine-glasses/riedel-veloce/champagne-wine-glass.webp',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Sauvignon Blanc',
    grapes: ['Gewürztraminer', 'Chasselas', 'Vermentino', 'Sémillon', 'Beerenauslese', 'Sauvignon Blanc (unoaked)', 'Corvina', 'Muskat-Ottonel', 'Dessertwine', 'Barsac', 'Sylvaner', 'Jurançon moelleux', 'Malvazija Istriana', 'Tokaji (dry)', 'Auslese (sweet)', 'Furmint', 'Trockenbeerenauslese', 'Ausbruch', 'Loire (Blanc)', 'Sancerre', 'Pouilly Fumé', 'Vin Santo', 'Ice wine', 'Blanc du Bois', 'Recioto di Soave', 'Muskateller', 'Traminer', 'Arneis', 'Quarts de Chaume', 'Coulée de Serrant', 'Gelber Muskateller', 'Loupiac', 'Tokaji (sweet)', 'Müller-Thurgau', 'Chenin Blanc', 'Sauternes', 'Monbazillac', 'Vouvray', 'Bacchus', 'Lambrusco'],
    image: '/api/static/images/wine-glasses/riedel-veloce/sauvignon-blanc.webp',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Riesling',
    grapes: ['Riesling', 'Albariño', 'Scheurebe', 'Riesling Smaragd', 'Rivaner', 'Beaujolais Nouveau', 'Schilcher', 'Mosel-Saar-Ruwer', 'Dolcetto', 'Soave', 'Zinfandel', 'Dornfelder', 'Alsace Grand Cru', 'Smaragd', 'Blauer Portugieser', 'Bardolino', 'Primitivo', 'Riesling (Spätlese/late harvest dry)', 'Jurançon Sec', 'Catteratto', 'Muscadine', 'Godello', 'Welschriesling', 'Grüner Veltliner', 'Zierfandler', 'Vernaccia', 'Bordeaux (white)'],
    image: '/api/static/images/wine-glasses/riedel-veloce/riesling.webp',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Chardonnay',
    grapes: ['Morillon (oaked)', 'Pouilly-Fuissé', 'Corton-Charlemagne', 'Meursault', 'Montrachet', 'Chardonnay (oaked)', 'Chablis', 'Burgundy (white)'],
    image: '/api/static/images/wine-glasses/riedel-veloce/chardonnay.webp',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Rosé',
    grapes: ['Côtes de Provence', 'Marsannay rosé', 'Rosé', 'Côtes du Rhône Rosé'],
    image: '/api/static/images/wine-glasses/riedel-veloce/rose.webp',
  },
];

WineGlass.collection.drop()
  .then(async () => {
    for (const wineGlass of wineGlasses) {
      await new WineGlass(wineGlass).save();
    }
  })
  .then(() => {
    process.exit(0);
  });
