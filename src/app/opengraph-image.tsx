import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';

export const alt = 'Awesome UI SDK, a community registry for Vercel UI SDK, with ink illustrations of a click-wheel player and a wristwatch.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const paper = '#f5f2e8';
const ink = '#25231e';
const muted = '#555046';
const rule = '#c2b9a5';
const blue = '#2346b3';
const atlas = { width: 1774, height: 887 };

function InkStudy({
  image, crop, width, left, top,
}: {
  image: string;
  crop: { x: number; y: number; width: number; height: number };
  width: number;
  left: number;
  top: number;
}) {
  const scale = width / crop.width;
  return (
    <div style={{ display: 'flex', position: 'absolute', left, top, width, height: crop.height * scale, overflow: 'hidden' }}>
      <img
        alt=""
        src={image}
        width={atlas.width * scale}
        height={atlas.height * scale}
        style={{ position: 'absolute', left: -crop.x * scale, top: -crop.y * scale }}
      />
    </div>
  );
}

export default async function OpenGraphImage() {
  const art = await readFile(join(process.cwd(), 'public', 'ink-studies.webp'));
  // The site's WebP needs a PNG representation for the OG image renderer.
  const png = await sharp(art).resize({ width: 887 }).png().toBuffer();
  const image = `data:image/png;base64,${png.toString('base64')}`;

  return new ImageResponse(
    <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '42px 58px 40px', background: paper, color: ink }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 17, borderBottom: `1px solid ${rule}`, fontSize: 21 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, letterSpacing: -.7 }}>
          <span>awesome</span><span style={{ color: blue }}>/</span><span>ui sdk</span>
        </div>
        <span style={{ color: muted }}>Community Registry</span>
      </div>

      <div style={{ display: 'flex', position: 'absolute', top: 117, bottom: 111, left: 582, width: 1, background: rule }} />
      <InkStudy image={image} crop={{ x: 73, y: 0, width: 672, height: 887 }} width={249} left={635} top={147} />
      <InkStudy image={image} crop={{ x: 1176, y: 9, width: 484, height: 878 }} width={145} left={937} top={176} />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, width: 496 }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 94, fontWeight: 800, lineHeight: 1, letterSpacing: -6 }}>
          <span>Awesome</span>
          <span>UI SDK</span>
        </div>
        <div style={{ display: 'flex', maxWidth: 430, marginTop: 23, color: muted, fontSize: 25, lineHeight: 1.35 }}>
          Libraries, tools, and experiments built with Vercel’s UI SDK.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: `1px solid ${rule}`, fontSize: 19 }}>
        <span style={{ color: muted }}>Libraries · Adapters · Tools · Examples</span>
        <span style={{ color: blue }}>awesome-ui-sdk.dev</span>
      </div>
    </div>,
    size,
  );
}
