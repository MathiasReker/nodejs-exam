import { Router } from 'express';
import sharp from 'sharp';
import * as fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:image', (req, res, next) => {
  let height = +req.query.h || 400;

  if (height > 500) {
    height = 500;
  }

  const inputFile = path.resolve(`./public/images/${req.params.image}`);

  if (!fs.existsSync(inputFile)) {
    return res.sendStatus(404);
  }

  const outputDirectory = `./public/cache/images/${req.params.image.slice(0, 2)}/`;

  const file = path.parse(inputFile);

  const outputFile = path.resolve(`${outputDirectory}${file.name}-${height}${file.ext}`);

  if (fs.existsSync(outputFile)) {
    return res.sendFile(outputFile);
  }

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  sharp(inputFile)
    .resize({ height })
    .toFile(outputFile)
    .then(() => {
      res.sendFile(outputFile);
    });
});

export default router;
