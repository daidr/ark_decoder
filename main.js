const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

let couldDecode = false;

var options = process.argv;
for (var i = 0; i < 4; i++) {
    switch (options[i]) {
        case "-all":
            couldDecode = true;
            backupImage();
            return;
        case "-backup":
            backupImage();
            return;
        case "-decode":
            decodeImage();
            return;
        default:
            break;
    }
}


function backupImage() {
    deleteDirectory('./Texture_After')
    fs.mkdirSync("./Texture_After", { recursive: true });
    fs.readdir("./Texture_Origin", function (err, files) {
        console.log(`创建立绘备份，可能花费较长时间，请稍后...`);
        let bt = new Date().getTime();
        for (let i = 0; i < files.length; i++) {
            if (files[i] != ".git") {
                fs.copyFileSync(`./Texture_Origin/${files[i]}`, `./Texture_After/${/(\w*#?[\d\w+]{0,7}(?:\[alpha\])?)\s{0,2}#?\S{0,8}\.png/.exec(files[i])[1]}.png`);
            }
        }
        console.log(`立绘备份创建完成，用时${new Date().getTime() - bt}ms`);
        if (couldDecode) {
            decodeImage();
        }
    });
}

function decodeImage() {
    deleteDirectory('./Texture_Final')
    fs.mkdirSync("./Texture_Final", { recursive: true });
    fs.readdir("./Texture_After", function (err, files) {
        console.log(`开始反混淆立绘，请稍后...`);
        bt = new Date().getTime();
        goNext(0);
        function goNext(i) {
            if (!files[i].includes("[alpha]")) {
                console.log(`${i}/${files.length} · 正在处理：${`./Texture_After/${files[i]}`}`);
                (async function () {
                    let mask = await sharp(`./Texture_After/${files[i].slice(0, -4) + "[alpha].png"}`)
                        .extractChannel("red");

                    let image = await sharp(`./Texture_After/${files[i]}`)
                        .removeAlpha();

                    let maskMetadata = await mask.metadata();
                    let imageMetadata = await image.metadata();
                    if (maskMetadata.width > imageMetadata.width) {
                        await image.resize(maskMetadata.width, maskMetadata.height);
                    } else if (maskMetadata.width < imageMetadata.width) {
                        await mask.resize(imageMetadata.width, imageMetadata.height);
                    }
                    let maskBuffer = await mask.toBuffer();
                    let imageBuffer = await image.toBuffer();
                    sharp(imageBuffer)
                        .joinChannel(maskBuffer)
                        .toFile(`./Texture_Final/${files[i]}`, function (_err, _info) {
                            if (i < files.length - 1) {
                                goNext(i + 1);
                            } else {
                                console.log(`立绘反混淆完成，用时${new Date().getTime() - bt}ms`);
                                console.log(`输出目录：./Texture_Final`);
                            }
                        })
                })()
            } else {
                if (i < files.length - 1) {
                    goNext(i + 1);
                } else {
                    console.log(`立绘反混淆完成，用时${new Date().getTime() - bt}ms`);
                    console.log(`输出目录：./Texture_Final`);
                }
            }
        }

    });
}

function deleteDirectory(dir) {
    if (fs.existsSync(dir) == true) {
        var files = fs.readdirSync(dir);
        files.forEach(function (item) {
            var item_path = path.join(dir, item);
            if (fs.statSync(item_path).isDirectory()) {
                deleteDirectory(item_path);
            }
            else {
                fs.unlinkSync(item_path);
            }
        });
        fs.rmdirSync(dir);
    }
}