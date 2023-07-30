import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.logSelectedValue',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          const configuration = vscode.workspace.getConfiguration('extension');
          const customText = configuration.get<string>('customText') ?? '✌️'; // Default to "✌️" if the setting is not defined

          editor.edit((editBuilder) => {
            const currentPosition = editor.selection.active;
            const logStatement = `console.log('${customText}${selectedText} --->', ${selectedText});\n`;
            editBuilder.insert(
              currentPosition.with(currentPosition.line + 1, 0),
              logStatement
            );
          });
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
