'use strict';

import { Router } from 'express';
import sharp from 'sharp';
import * as fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:image', (req, res) => {
  let height = +req.query.h || 400;

  if (height > 500) {
    height = 500;
  }

  const inputFile = path.resolve(`./public/images/${req.params.image}`);

  if (!fs.existsSync(inputFile)) {
    return res.status(404);
  }

  const output = `./public/cache/images/${req.params.image.slice(0, 2)}/`;

  const file = path.parse(inputFile);

  const outputFile = path.resolve(`${output}${file.name}-${height}${file.ext}`);

  if (fs.existsSync(outputFile)) {
    return res.sendFile(outputFile);
  }

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }

  sharp(inputFile)
    .resize({ height: +height })
    .toFile(outputFile)
    .then(() => {
      res.sendFile(outputFile);
    });
});

export default router;
