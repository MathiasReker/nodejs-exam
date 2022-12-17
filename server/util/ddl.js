import dotenv from 'dotenv';
import WineGlass from '../model/WineGlass.js';
import connection from './connection.js';

dotenv.config();

connection();

const data = [
  {
    series: 'RIEDEL Veloce',
    name: 'Cabernet/Merlot',
    grapes: ['Pomerol', 'St. Julien', 'Fronsac', 'St. Estèphe', 'Petit Verdot', 'Merlot', 'Margaux', 'Pauillac', 'Brunello di Montalcino', 'Montepulciano', 'Cabernet Franc', 'Pessac Leognan (Rouge)', 'Graves rouge', 'Médoc', 'Cabernet Sauvignon', 'Carménère', 'St. Emilion', 'Bordeaux (red)', 'Listrac'],
    image: 'https://img.riedel.com/ct/w_920,q_100,hash_2f4139/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000098_w-0bSeEOM6.jpg',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Pinot Noir/Nebbiolo',
    grapes: ['Blauburgunder', 'Moulin à vent', 'Nebbiolo', 'Nerello Mascalese', 'Echézeaux', 'Beaujolais Cru', 'Barbaresco', 'Volnay', 'Blanc de Noirs', 'Romanée Saint Vivant', 'Musigny', 'Chambolle Musigny', 'Vougeot', 'Rosé Champagne', 'Vosne-Romanée', 'Nuits Saint Georges', 'Pinot Noir New World', 'St. Aubin', 'Pinot Noir Old World', 'Burgundy (red)', 'Pommard', 'Barolo', 'Santenay'],
    image: 'https://img.riedel.com/ct/w_920,q_100,hash_153088/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000007_w-rzNxAoNl.jpg',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Syrah/Shiraz',
    grapes: ['Rioja', 'Malbec', 'Syrah Old World', 'Ribera del Duero', 'Cornas', 'Côtes du Rhône Rouge', 'Crozes Hermitage', 'Bonarda', 'Tinto Reserva', 'Priorat', 'Amarone', 'Carignan', 'Châteauneuf-du-Pape (blanc)', 'Alma Valley', 'Sangiovese', 'Côtes du Roussillon', 'Aglianico', 'Vino Nobile di Montepulciano', 'Barbera', 'Tinta de Toro', 'Touriga Nacional', 'Cannonau', 'Blaufränkisch', 'Graciano', 'Nero d\'Avola', 'Saperavi', 'Zweigelt', 'Bobal', 'St. Joseph (red)', 'Châteauneuf-du-Pape (rouge)', 'Tempranillo', 'Petite Sirah', 'Cahors', 'Teroldego', 'St. Laurent', 'Côte Rôtie', 'Refosco', 'Crianza', 'Montagny', 'Lagrein', 'Côtes du Ventoux', 'Montsant', 'Madiran', 'Grenache/Granacha', 'Gran Reserva', 'Mourvèdre', 'Hermitage (Rouge)', 'Cinsault', 'Mencia', 'Pinotage', 'Hermitage (Blanc)', 'Norton', 'Valpolicella'],
    image: 'https://img.riedel.com/ct/w_920,q_100,hash_79ca1e/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000041_w-cTiRTU_o.jpg',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Champagne Wine Glass',
    grapes: ['Champagne', 'Sparkling Wine', 'Cava', 'Franciacorta', 'Sekt', 'Blanc de Blancs', 'Prosecco'],
    image: 'https://img.riedel.com/ct/w_920,q_100,hash_3c41a9/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000028_w-5HRsg1Jn.jpg',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Sauvignon Blanc',
    grapes: ['Gewürztraminer', 'Chasselas', 'Vermentino', 'Sémillon', 'Beerenauslese', 'Sauvignon Blanc (unoaked)', 'Corvina', 'Muskat-Ottonel', 'Dessertwine', 'Barsac', 'Sylvaner', 'Jurançon moelleux', 'Malvazija Istriana', 'Tokaji (dry)', 'Auslese (sweet)', 'Furmint', 'Trockenbeerenauslese', 'Ausbruch', 'Loire (Blanc)', 'Sancerre', 'Pouilly Fumé', 'Vin Santo', 'Ice wine', 'Blanc du Bois', 'Recioto di Soave', 'Muskateller', 'Traminer', 'Arneis', 'Quarts de Chaume', 'Coulée de Serrant', 'Gelber Muskateller', 'Loupiac', 'Tokaji (sweet)', 'Müller-Thurgau', 'Chenin Blanc', 'Sauternes', 'Monbazillac', 'Vouvray', 'Bacchus', 'Lambrusco'],
    image: 'https://img.riedel.com/ct/w_920,q_100,hash_3bbfa6/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000033_w-ZJfKobUH.jpg',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Riesling',
    grapes: ['Riesling', 'Albariño', 'Scheurebe', 'Riesling Smaragd', 'Rivaner', 'Beaujolais Nouveau', 'Schilcher', 'Mosel-Saar-Ruwer', 'Dolcetto', 'Soave', 'Zinfandel', 'Dornfelder', 'Alsace Grand Cru', 'Smaragd', 'Blauer Portugieser', 'Bardolino', 'Primitivo', 'Riesling (Spätlese/late harvest dry)', 'Jurançon Sec', 'Catteratto', 'Muscadine', 'Godello', 'Welschriesling', 'Grüner Veltliner', 'Zierfandler', 'Vernaccia', 'Bordeaux (white)'],
    image: 'https://img.riedel.com/ct/w_370,q_100,hash_5e9ba2/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000098_w-0bSeEOM6.jpg',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Chardonnay',
    grapes: ['Morillon (oaked)', 'Pouilly-Fuissé', 'Corton-Charlemagne', 'Meursault', 'Montrachet', 'Chardonnay (oaked)', 'Chablis', 'Burgundy (white)'],
    image: 'https://img.riedel.com/ct/w_920,q_100,hash_c1134c/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000097_w-BCZy9PGM.jpg',
  },
  {
    series: 'RIEDEL Veloce',
    name: 'Rosé',
    grapes: ['Côtes de Provence', 'Marsannay rosé', 'Rosé', 'Côtes du Rhône Rosé'],
    image: 'https://img.riedel.com/ct/w_920,q_100,hash_db15fd/60911db7c15017946c3c-1e4ce00b1c6f4bf7f0f46bf77c747775.ssl.cf3.rackcdn.com/633000055_w-4y3PHlNU.jpg',
  },
];

WineGlass.collection.drop()
  .then(async () => {
    for (const el of data) {
      const wineGlass = new WineGlass(el);
      await wineGlass.save();
    }
  })
  .then(() => {
    process.exit(0);
  });
