const ProductShema = {
  id         : { type: 'increments', nullable: false, primary: true },
  coverImage : { type: 'string', maxlength: 255, nullable: false },
  name       : { type: 'string', maxlength: 50, nullable: false },
  price      : { type: 'integer', nullable: false, unsigned: true },
  desc       : { type: 'string',maxlength: 255, nullable: false },
  heading1   : { type: 'string', maxlength: 50, nullable: false },
  heading2   : { type: 'string', maxlength: 50, nullable: false },
  heading3   : { type: 'string', maxlength: 50, nullable: false },
  headText1  : { type: 'string', maxlength: 255, nullable: false },
  headText2  : { type: 'string', maxlength: 255, nullable: false },
  headText3  : { type: 'string', maxlength: 255, nullable: false }
};
module.exports = ProductShema;