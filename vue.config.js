module.exports = {
  pluginOptions: {
    electronBuilder: {
      outputDir: "dist_electron",
      electronBuilder: {
        externals: ["wallpaper"]
      },
      builderOptions: {
        productName: "GreatWall",
        artifactName: "GreatWall-${version}.${ext}",
        copyright: "Copyright © 2020 GreatGui",
        publish: [
          {
            provider: "github",
            owner: "GreatGui",
            repo: "GreatWall"
          }
        ],
        // icon: "./public/Pictures.ico",
        win: {
          verifyUpdateCodeSignature: false,
          target: [
            {
              target: "nsis",
              arch: "x64"
            }
          ]
        },
        nsis: {
          installerIcon: "./public/Pictures.ico",
          displayLanguageSelector: true,
          oneClick: false,
          perMachine: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true
        },
        files: [
          "!{dist,.gitignore,.vscode,docs,dev-app-update.yml,babel.config.js}"
        ],
        compression: "maximum"
      }
    }
  }
};
