import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.logSelectedValue',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          editor.edit((editBuilder) => {
            const currentPosition = editor.selection.active;
            const logStatement = `console.log(${selectedText});`;
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
