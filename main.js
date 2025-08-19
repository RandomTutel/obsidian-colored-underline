const { Plugin, PluginSettingTab, Setting } = require("obsidian");

module.exports = class UnderlineColorPlugin extends Plugin {
  async onload() {
    
    this.settings = await this.loadData() || { recentColors: ["blue"] };

    
    this.addCommand({
      id: "underline-colored",
      name: "Underline text (colored)",
      hotkeys: [{ modifiers: ["Mod"], key: "u" }],
      editorCallback: (editor) => {
        const selection = editor.getSelection();
        const color = this.settings.recentColors[0] ?? "blue";
        editor.replaceSelection(
          `<u style="text-decoration-color:${color};">${selection}</u>`
        );
      }
    });

    
    this.addCommand({
      id: "set-underline-color-1",
      name: "Set underline color to 🟥 RED",
      callback: async () => {
        const newColor = "red";
          this.updateRecentColors(newColor);
      }
    });


    this.addCommand({
      id: "set-underline-color-2",
      name: "Set underline color to 🟦 BLUE",
      callback: async () => {
        const newColor = "blue";
          this.updateRecentColors(newColor);
      }
    });

       this.addCommand({
      id: "set-underline-color-3",
      name: "Set underline color to 🟩 GREEN",
      callback: async () => {
        const newColor = "green";
          this.updateRecentColors(newColor);
      }
    });

        this.addCommand({
      id: "set-underline-color-4",
      name: "Set underline color to 🟨 YELLOW",
      callback: async () => {
        const newColor = "yellow";
          this.updateRecentColors(newColor);
      }
    });

    
    this.addSettingTab(new UnderlineColorSettingTab(this.app, this));
  }

  onunload() {}

  updateRecentColors(newColor) {
    
    this.settings.recentColors = [newColor, ...this.settings.recentColors.filter(c => c !== newColor)].slice(0, 3);
    this.saveData(this.settings);
  }
};


class UnderlineColorSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Underline Color Plugin Settings" });

    
    const currentColor = this.plugin.settings.recentColors[0] ?? "blue";

    new Setting(containerEl)
      .setName("Custom color")
      .setDesc("Choose a CSS color (ex: purple, #ff00ff, rgb(128,0,128))")
      .addText(text => 
        text
          .setPlaceholder("Choose a color")
          .setValue(currentColor)
          .onChange(async (value) => {
            this.plugin.updateRecentColors(value.trim());
          })
      );
  }
}

