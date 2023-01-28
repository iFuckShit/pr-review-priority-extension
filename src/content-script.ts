import * as $ from "jquery";

let insertionId = 0;

const priorityOptions = [
  {
    displayName: "⛰ 不可通过，须即刻更改",
    textInsertion: "⛰ 泰山 / **不可通过，须即刻更改**",
  },
  {
    displayName: "🧗‍♀️ 不可通过",
    textInsertion: "🧗‍♀️ 磐石 / **不可通过**",
  },
  {
    displayName: "⚪️ 并无大碍，但需要采取操作",
    textInsertion: "⚪️ 石子 / 并无大碍，但需要采取操作",
  },
  {
    displayName: "⏳ 并无大碍，但需要重新考虑",
    textInsertion: "⏳ 细沙 / 并无大碍，但需要重新考虑",
  },
  {
    displayName: "🌫 并无大碍：提一嘴",
    textInsertion: "🌫 尘埃 / 并无大碍：提一嘴",
  },
];

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const containerEl = node as Element;
      if (containerEl.className?.includes("js-inline-comments-container")) {
        insertionId += 1;
        const selectId = `priority-${insertionId}`;
        $(".form-actions", node)
          .before(`<select id="${selectId}" style="float: left; height: 34px; margin-left: 8px;">
    ${priorityOptions
      .map(
        (priority) =>
          `<option value="${priority.textInsertion}">${priority.displayName}</option>`
      )
      .join("\n")}
  </select>
</div>`);
        $(
          ".form-actions .review-simple-reply-button, .form-actions .btn-primary",
          node
        ).click((e) => {
          const $textarea = $(".comment-form-textarea", node);
          $textarea.val(
            `|优先级|\n|---|\n|${
              $(`#${selectId}`).val() as string
            }|\n\n${$textarea.val() as string}`
          );
          e.stopPropagation();
        });
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
