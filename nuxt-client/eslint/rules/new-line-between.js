const utils = require('eslint-plugin-vue/lib/utils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
const exceptions = ['components', 'meta'];

module.exports = {
  create: (context) => {
    const sourceCode = context.getSourceCode();

    function report(node) {
      context.report({
        fix(fixer) {
          return fixer.insertTextBefore(node, '\n');
        },
        messageId: 'expected',
        node,
      });
    }

    /**
     * Returns the number of lines of comments that precede the node
     * @param {ASTNode} node node to check for overlapping comments
     * @param {number} lineNumTokenBefore line number of previous token, to check for overlapping comments
     * @returns {number} Number of lines of comments that precede the node
     * @private
     */
    function calcCommentLines(node, lineNumTokenBefore) {
      const comments = sourceCode.getCommentsBefore(node);

      let numLinesComments = 0;

      if (!comments.length) {
        return numLinesComments;
      }

      comments.forEach((comment) => {
        numLinesComments++;

        if (comment.type === 'Block') {
          numLinesComments += comment.loc.end.line - comment.loc.start.line;
        }

        // avoid counting lines with inline comments twice
        if (comment.loc.start.line === lineNumTokenBefore) {
          numLinesComments--;
        }

        if (comment.loc.end.line === node.loc.start.line) {
          numLinesComments--;
        }
      });

      return numLinesComments;
    }

    function hasNewLineBefore(node) {
      const lineNumNode = node.loc.start.line;
      const lineNumTokenBefore = getLineNumberOfTokenBefore(node);
      const commentLines = calcCommentLines(node, lineNumTokenBefore);

      return lineNumNode - lineNumTokenBefore - commentLines > 1;
    }

    function getLineNumberOfTokenBefore(node) {
      const tokenBefore = sourceCode.getTokenBefore(node);

      let lineNumTokenBefore;

      /**
       * Global return (at the beginning of a script) is a special case.
       * If there is no token before `return`, then we expect no line
       * break before the return. Comments are allowed to occupy lines
       * before the global return, just no blank lines.
       * Setting lineNumTokenBefore to zero in that case results in the
       * desired behavior.
       */
      if (tokenBefore) {
        lineNumTokenBefore = tokenBefore.loc.end.line;
      } else {
        lineNumTokenBefore = 0; // global return at beginning of script
      }

      return lineNumTokenBefore;
    }

    function maybeReportLackOfnewLine(node, nodeIndex) {
      // no need for a newline above first subproperty
      if (nodeIndex !== 0) {
        const hasNewLine = hasNewLineBefore(node);

        if (!hasNewLine) {
          report(node);
        }
      }
    }

    return utils.executeOnVue(context, (obj) => {
      const rootProperties = obj.properties.filter(
        (p) => !exceptions.includes(p.key.name)
      );

      rootProperties.forEach((property, i) => {
        maybeReportLackOfnewLine(property, i);

        const subProperties = property.value.properties;

        if (subProperties) {
          subProperties.forEach(maybeReportLackOfnewLine);
        }
      });
    });
  },
  meta: {
    docs: {
      category: undefined,
      // url: 'fill url when creating the PR in eslint-plugin-vue',
      description:
        'Enforce newlines between base properties of vue component code.',
    },
    fixable: 'code',
    messages: {
      expected: 'Expected newline before property',
    },
    schema: [],
    type: 'suggestion',
  },
};
