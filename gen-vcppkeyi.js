import sharp  from "sharp";
import {nodefs, filesFromPattern,
     writeChanged, readTextContent, readTextLines} from 'ptk/nodebundle.cjs'
await nodefs;
const dir1='./raw/vcppkeyi1/';
const dir2='./raw/vcppkeyi2/';

const files1=filesFromPattern('*.*',dir1)
const files2=filesFromPattern('*.*',dir2);
const W=720;
const H=1600;
const fit='fill';//contain'
const background={r:243, g:208, b:160};
const quality=18;
const dofile=async (fn,startpage,outdir)=>{
    const buf=sharp(fs.readFileSync(fn));
    //console.log(buf);
    const opts={left:469,top:144,width:417,height:880};
     
    //right    
    let outfn=outdir+(startpage.toString().padStart(3,'0')) +'.jpg';
    let outbuf=buf.clone().extract(opts)
    outbuf=await outbuf
    .resize(W,H,{fit,background})
    .jpeg({quality,mozjpeg:true}).toBuffer();
    writeChanged(outfn,outbuf,false,'');//write binary buffer
    console.log(fn,outfn)
    //left
    startpage++;
    opts.left=10;
    outfn=outdir+(startpage.toString().padStart(3,'0'))+'.jpg';
    outbuf=buf.clone().extract(opts)
    outbuf=await outbuf
    .resize(W,H,{fit,background})
    .jpeg({quality,mozjpeg:true}).toBuffer();
    writeChanged(outfn,outbuf,false,'');//write binary buffer
    console.log(fn,outfn)
}
//files1.length=4;
let startpage=1;
for (let i=0;i<files1.length;i++) {
    dofile(dir1+files1[i],startpage,'./out/vcppkeyi1/');
    startpage+=2;
}
startpage=1;
for (let i=0;i<files2.length;i++) {
    dofile(dir2+files2[i],startpage,'./out/vcppkeyi2/');
    startpage+=2;
}

//files2.forEach((fn)=>dofile(dir2+fn))