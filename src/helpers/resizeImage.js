import Buffer from 'buffer';

const resizeImage = (bufferFile) => {
  // Vérifier si le fichier est une image en utilisant la propriété type de l'objet File ou de la chaîne data de l'objet Buffer
  if (!bufferFile.type || !bufferFile.type.startsWith("image/")) {
    console.error("Le fichier sélectionné n'est pas une image");
    return;
  }

  // Créer un nouveau canvas et définir sa taille
  let canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;

  // Charger le buffer image dans un élément image
  let image = new Image();
  image.src = bufferFile;

  // Dessiner l'image sur le canvas en utilisant la méthode drawImage
  let ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, 200, 200);

  // Récupérer le nouveau buffer image du canvas sous forme de chaîne de caractères au format base64
  let newBufferImage = canvas.toDataURL();

  // Créer un nouveau buffer à partir de la chaîne de caractères au format base64
  let imageBuffer = Buffer.from(newBufferImage, "base64");

  return imageBuffer;
};

export default resizeImage;